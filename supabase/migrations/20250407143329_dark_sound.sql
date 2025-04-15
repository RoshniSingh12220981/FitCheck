/*
  # Initial Schema Setup for TaskFlow Pro

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to Supabase auth.users
    - `workspaces`
      - Represents project workspaces
      - Contains workspace settings and metadata
    - `workspace_members`
      - Junction table for workspace members
      - Manages user roles within workspaces
    - `tasks`
      - Core task information
      - Includes title, description, status, priority
    - `task_assignments`
      - Links tasks to assigned users
    - `comments`
      - Task comments and updates
    - `attachments`
      - Files/links attached to tasks

  2. Security
    - RLS policies for each table
    - Workspace-based access control
    - Member-specific permissions
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE task_status AS ENUM ('backlog', 'todo', 'in_progress', 'in_review', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workspaces table
CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workspace members junction table
CREATE TABLE workspace_members (
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status task_status DEFAULT 'backlog',
  priority task_priority DEFAULT 'medium',
  due_date timestamptz,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Task assignments
CREATE TABLE task_assignments (
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  PRIMARY KEY (task_id, user_id)
);

-- Comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Attachments table
CREATE TABLE attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  name text NOT NULL,
  url text NOT NULL,
  type text,
  size integer,
  uploaded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Workspace policies
CREATE POLICY "Workspace members can view workspaces" ON workspaces
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = workspaces.id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace admins can update workspaces" ON workspaces
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = workspaces.id
      AND workspace_members.user_id = auth.uid()
      AND workspace_members.role IN ('admin', 'owner')
    )
  );

-- Tasks policies
CREATE POLICY "Workspace members can view tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = tasks.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace members can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = tasks.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Task creators and assignees can update tasks" ON tasks
  FOR UPDATE USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM task_assignments
      WHERE task_assignments.task_id = tasks.id
      AND task_assignments.user_id = auth.uid()
    )
  );

-- Comments policies
CREATE POLICY "Workspace members can view comments" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN workspace_members ON workspace_members.workspace_id = tasks.workspace_id
      WHERE tasks.id = comments.task_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace members can create comments" ON comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN workspace_members ON workspace_members.workspace_id = tasks.workspace_id
      WHERE tasks.id = comments.task_id
      AND workspace_members.user_id = auth.uid()
    )
  );

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();