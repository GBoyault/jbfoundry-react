import { Comment, InputValidateValueFunction, emailSchema } from '../models';

/**
 * @todo find a better way of sorting comments
 *
 * This current algo loops over unsorted children and sets them after their parents, until every child is sorted, 5 time maximum
 *
 * The problem: comments are provided by the API 5 by 5, sorted by date
 * When a reply comment has been been written a long time after its parent,
 * the parent might not be fetched at first and in this case the child stays unsorted
 *
 * The temporary solution is to loop 5 times only to avoid an infinite
 */
export const sortCommentByThread = (comments: Comment[]): Comment[] => {
  const sorted = comments.filter((comment) => comment.parent === 0);
  const unSortedChildren = comments.filter((comment) => comment.parent > 0);

  const sortedChildrenIds: number[] = [];

  let loops = 0;

  while (sorted.length < comments.length && loops < 5) {
    for (const child of unSortedChildren) {
      if (sortedChildrenIds.includes(child.id)) {
        continue;
      }

      const parentIndex = sorted.findIndex(
        (parent) => parent.id === child.parent
      );

      if (parentIndex === -1) {
        continue;
      }

      child.depth = sorted[parentIndex].depth ?? 0;
      child.depth++;

      sorted.splice(parentIndex + 1, 0, child);
      sortedChildrenIds.push(child.id);
    }

    loops++;
  }

  return sorted;
};

export const isNotEmpty: InputValidateValueFunction = (value) =>
  value.trim() !== '';

export const isEmail: InputValidateValueFunction = (value) =>
  '' === value || emailSchema.safeParse(value).success;
