import { Board } from '../../board/service'
import { Issue, IssueStatus, IssueType } from '../../issue/service'

const generateDefaultLocalBoards = (
  boardCount: number,
  namePattern: string = 'Local %d'
): Board[] => {
  let boards: Board[] = []

  for (let i = 0; i < boardCount; i++) {
    boards.push({
      id: i + 1,
      name: namePattern.replace('%d', i.toString()),
    })
  }
  return boards
}

const generateUuidv4 = () => {
  // Generate a random UUID v4 (https://stackoverflow.com/a/2117523/1098564)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const generatDefaultIssues = (
  boardIds: number[],
  issueCount: number,
  namePattern: string = 'Issue %d'
): Issue[] => {
  let issues: Issue[] = []

  for (let i = 0; i < issueCount; i++) {
    // Pick random status
    const status: IssueStatus = ['TODO', 'IN_PROGRESS', 'DONE'][
      Math.floor(Math.random() * 3)
    ] as IssueStatus
    // Pick random type
    const type: IssueType = ['TASK', 'BUG', 'USER_STORY'][
      Math.floor(Math.random() * 3)
    ] as IssueType

    // Randomize a number of boards ids
    const maxAssignments = Math.floor(Math.random() * (boardIds.length - 1)) + 1
    let ids: number[] = []
    for (let i = 0; i < maxAssignments; i++) {
      // generate a random board index to assign to
      const randomIndex = Math.floor(Math.random() * boardIds.length)

      // check if the board is already assigned
      if (ids.indexOf(boardIds[randomIndex]) === -1) {
        ids.push(boardIds[randomIndex])
      } else {
        // if the board is already assigned, try again
        i--
      }
    }

    issues.push({
      id: generateUuidv4(),
      title: namePattern.replace('%d', i.toString()),
      boards: ids,
      status,
      type,
    })
  }

  return issues
}

export { generateDefaultLocalBoards, generatDefaultIssues, generateUuidv4 }
