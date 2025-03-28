import { formatRelative } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (createdAt: Date) => {
  try {
    const test = formatRelative(new Date(createdAt), new Date(), {
      locale: id,
    });
    return test
    // return format(test, "yyyy-MM-dd");
  } catch (error) {
    console.log("🚀 ~ formatDate ~ error:", error);
  }
};
