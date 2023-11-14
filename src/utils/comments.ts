import { Comment, InputValidateValueFunction, emailSchema } from "../models";

export const sortCommentByThread = (comments: Comment[]): Comment[] => {
  const sorted: Comment[] = comments.filter(comment => comment.parent === 0)
  const unSortedChildren: Comment[] = comments.filter(comment => comment.parent > 0)
  const sortedChildrenIds: number[] = []

  let loops = 0

  while (sorted.length < comments.length && loops < 5) {
    for (const child of unSortedChildren) {

      if (sortedChildrenIds.includes(child.id)) {
        continue
      }

      const parentIndex = sorted.findIndex(parent => parent.id === child.parent)

      if (parentIndex === -1) {
        continue
      }

      child.depth = sorted[parentIndex].depth ?? 0
      child.depth++
      sorted.splice(parentIndex + 1, 0, child)
      sortedChildrenIds.push(child.id)
    }

    loops++
  }

  return sorted
}


export const isNotEmpty: InputValidateValueFunction = (value) => value.trim() !== '';
export const isEmail: InputValidateValueFunction = (value) =>
  '' === value || emailSchema.safeParse(value).success
