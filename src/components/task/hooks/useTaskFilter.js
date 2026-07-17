// src/components/task/hooks/useTaskFilter.js
import { useMemo } from "react";

const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const useTaskFilter = (
  tasks,
  {
    search = "",
    priority = "All",
    category = "All",
    status = "All",
    sortBy = "dueDate",
    sortOrder = "asc",
  }
) => {
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // ============================
    // KEYWORD SEARCH PATTERN MATCHING
    // ============================
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((task) => {
        return (
          task.title?.toLowerCase().includes(keyword) ||
          task.description?.toLowerCase().includes(keyword) ||
          task.category?.toLowerCase().includes(keyword)
        );
      });
    }

    // ============================
    // STRUCTURAL FILTERS MATRIX
    // ============================
    if (priority !== "All") {
      result = result.filter(
        (task) => task.priority === priority
      );
    }

    if (category !== "All") {
      result = result.filter(
        (task) => task.category === category
      );
    }

    if (status !== "All") {
      result = result.filter(
        (task) => task.status === status
      );
    }

    // ============================
    // SORTING STACK EVALUATION
    // ============================
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = (a.title || "").localeCompare(b.title || "");
          break;

        case "priority":
          comparison =
            (priorityOrder[b.priority] || 0) -
            (priorityOrder[a.priority] || 0);
          break;

        case "createdAt":
          // Firestore backend timestamps/ISO strings fallback safely here
          comparison =
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0);
          break;

        case "dueDate":
        default: {
          // OPTIMIZATION: If due dates are empty string tokens "", push them to the end of list values gracefully
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : (sortOrder === "asc" ? Infinity : -Infinity);
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : (sortOrder === "asc" ? Infinity : -Infinity);
          comparison = dateA - dateB;
          break;
        }
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    tasks,
    search,
    priority,
    category,
    status,
    sortBy,
    sortOrder,
  ]);

  return filteredTasks;
};

export default useTaskFilter;
