import { z } from "zod";

export const addCoursesSchema = z.object({
  courses: z.array(
    z.object({
      title: z.string().min(1, "Course title cannot be empty"),
    })
  ).min(1, "Please add at least one course"),
});

export type AddCoursesSchema = z.infer<typeof addCoursesSchema>;

