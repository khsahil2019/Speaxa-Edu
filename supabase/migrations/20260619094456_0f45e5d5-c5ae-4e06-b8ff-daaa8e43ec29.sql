
-- 1. Tighten demo_requests INSERT policy + add field constraints
DROP POLICY IF EXISTS "Anyone can submit a demo request" ON public.demo_requests;
CREATE POLICY "Anyone can submit a demo request"
  ON public.demo_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(mobile) BETWEEN 7 AND 20
    AND (message IS NULL OR char_length(message) <= 2000)
    AND (teacher_slug IS NULL OR char_length(teacher_slug) <= 100)
    AND (course_slug IS NULL OR char_length(course_slug) <= 100)
    AND (class_level IS NULL OR char_length(class_level) <= 50)
    AND (board IS NULL OR char_length(board) <= 50)
    AND (preferred_time IS NULL OR char_length(preferred_time) <= 100)
  );

ALTER TABLE public.demo_requests
  DROP CONSTRAINT IF EXISTS demo_requests_status_check;
ALTER TABLE public.demo_requests
  ADD CONSTRAINT demo_requests_status_check
  CHECK (status IN ('new', 'contacted', 'scheduled', 'converted', 'lost'));

-- 2. Tighten waitlist INSERT policy with field validation
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(mobile) BETWEEN 7 AND 20
    AND (interested_course IS NULL OR char_length(interested_course) <= 100)
    AND (notes IS NULL OR char_length(notes) <= 2000)
  );

-- 3. Revoke EXECUTE on SECURITY DEFINER functions from anon/public.
-- has_role is invoked from RLS policies for authenticated users only.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
