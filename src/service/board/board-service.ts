import { GetBoardsApiResponse } from "../../lib/api/response"
import fetcher from "../../lib/fetcher"
import { GetBoardsHandler } from "../service"

const getBoards: GetBoardsHandler = async () => {
  return fetcher<GetBoardsApiResponse>({
    url: process.env.REACT_APP_API_BASE_URL + '/boards',
  })
}

export {
  getBoards
}