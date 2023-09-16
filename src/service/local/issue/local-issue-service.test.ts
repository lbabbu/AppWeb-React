import { Issue } from '../../issue/service'
import * as localIssueService from './local-issue-service'

const sampleIssues: Issue[] = [
  {
    id: '1',
    title: 'Issue 1',
    boards: [1],
    status: 'TODO',
    type: 'TASK',
  },
  {
    id: '2',
    title: 'Issue 2',
    boards: [2],
    status: 'IN_PROGRESS',
    type: 'BUG',
  },
]

describe('getIssues', () => {
  it('should return issues filtered by board id', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleIssues))

    // Call getIssues with boardId 1
    const issues = await localIssueService.getIssues(1)

    // Check if issues is an array with one issue
    expect(Array.isArray(issues)).toEqual(true)
    expect(issues.length).toEqual(1)
    expect(issues[0].id).toEqual('1')
    expect(issues[0].title).toEqual('Issue 1')
    expect(issues[0].boards).toEqual([1])
    expect(issues[0].status).toEqual('TODO')
    expect(issues[0].type).toEqual('TASK')

    // Call getIssues with boardId 2
    const issues2 = await localIssueService.getIssues(2)

    // Check if issues is an array with one issue
    expect(Array.isArray(issues2)).toEqual(true)
    expect(issues2.length).toEqual(1)
    expect(issues2[0].id).toEqual('2')
    expect(issues2[0].title).toEqual('Issue 2')
    expect(issues2[0].boards).toEqual([2])
    expect(issues2[0].status).toEqual('IN_PROGRESS')
    expect(issues2[0].type).toEqual('BUG')

    // Reset mock
    spy.mockReset()
  })
})

describe('createIssue', () => {
  it('should create a new issue', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleIssues))

    // Call createIssue with boardId 1
    const issue = await localIssueService.createIssue(1, {
      title: 'New Issue',
    })

    // Check if issue is an object
    expect(typeof issue).toEqual('object')
    expect(issue.id).toBeDefined()
    expect(issue.title).toEqual('New Issue')
    expect(issue.boards).toEqual([1])
    expect(issue.status).toEqual('TODO')
    expect(issue.type).toEqual('TASK')

    // Mock reset
    spy.mockReset()
  })
})

describe('updateIssueStatus', () => {
  it('should update the status of an issue', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleIssues))

    // Call updateIssueStatus with issueId 1 and status DONE
    const success = await localIssueService.updateIssueStatus('1', 'DONE')

    // Check if success is true
    expect(success).toEqual(true)

    // Mock reset
    spy.mockReset()
  })
})

describe('searchIssues', () => {
  it('should search issues by title or type', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleIssues))

    // Call searchIssues with boardId 1 and input TASK
    const issues = await localIssueService.searchIssues(1, {
      type: 'TASK',
    })

    // Check if issues is an array with one issue
    expect(Array.isArray(issues)).toEqual(true)
    expect(issues.length).toEqual(1)
    expect(issues[0].id).toEqual('1')
    expect(issues[0].title).toEqual('Issue 1')
    expect(issues[0].boards).toEqual([1])
    expect(issues[0].status).toEqual('TODO')
    expect(issues[0].type).toEqual('TASK')

    // Call searchIssues with boardId 2 and input Issue 1
    const issues2 = await localIssueService.searchIssues(2, {
      query: 'Issue 1',
    })

    // Check if issues is an array with one issue
    expect(Array.isArray(issues2)).toEqual(true)
    expect(issues2.length).toEqual(0)

    // Call searchIssues with boardId 2 and input Issue 2
    const issues3 = await localIssueService.searchIssues(2, {
      query: 'Issue 2',
    })

    // Check if issues is an array with one issue
    expect(Array.isArray(issues3)).toEqual(true)
    expect(issues3.length).toEqual(1)
    expect(issues3[0].id).toEqual('2')
    expect(issues3[0].title).toEqual('Issue 2')
    expect(issues3[0].boards).toEqual([2])
    expect(issues3[0].status).toEqual('IN_PROGRESS')
    expect(issues3[0].type).toEqual('BUG')

    // Call searchIssues with boardId 2 and input BUG
    const issues4 = await localIssueService.searchIssues(2, {
      type: 'BUG',
    })

    // Check if issues is an array with one issue
    expect(Array.isArray(issues4)).toEqual(true)
    expect(issues4.length).toEqual(1)
    expect(issues4[0].id).toEqual('2')
    expect(issues4[0].title).toEqual('Issue 2')
    expect(issues4[0].boards).toEqual([2])
    expect(issues4[0].status).toEqual('IN_PROGRESS')
    expect(issues4[0].type).toEqual('BUG')

    // Call searchIssues with boardId 2 and input BUG and Issue 2
    const issues5 = await localIssueService.searchIssues(2, {
      type: 'BUG',
      query: 'Issue 2',
    })

    // Check if issues is an array with one issue
    expect(Array.isArray(issues5)).toEqual(true)
    expect(issues5.length).toEqual(1)
    expect(issues5[0].id).toEqual('2')
    expect(issues5[0].title).toEqual('Issue 2')
    expect(issues5[0].boards).toEqual([2])
    expect(issues5[0].status).toEqual('IN_PROGRESS')
    expect(issues5[0].type).toEqual('BUG')

    // Mock reset
    spy.mockReset()
  })
})

describe('saveIssues', () => {
  it('should save issues to localstorage', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'setItem')
    spy.mockReturnValue()

    // Call saveIssues
    await localIssueService.saveIssues(sampleIssues)

    // Check if setItem is called
    expect(spy).toBeCalled()

    // Mock reset
    spy.mockReset()
  })
})

// Path: src/service/local/issue/local-issue-service.ts
