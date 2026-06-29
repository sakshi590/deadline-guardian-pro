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

    // Search
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

    // Priority Filter
    if (priority !== "All") {
      result = result.filter(
        (task) => task.priority === priority
      );
    }

    // Category Filter
    if (category !== "All") {
      result = result.filter(
        (task) => task.category === category
      );
    }

    // Status Filter
    if (status !== "All") {
      result = result.filter(
        (task) => task.status === status
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;

        case "priority":
          comparison =
            priorityOrder[b.priority] -
            priorityOrder[a.priority];
          break;

        case "createdAt":
          comparison =
            new Date(a.createdAt) -
            new Date(b.createdAt);
          break;

        case "dueDate":
        default:
          comparison =
            new Date(a.dueDate) -
            new Date(b.dueDate);
      }

      return sortOrder === "asc"
        ? comparison
        : -comparison;
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