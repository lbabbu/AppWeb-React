import { Box } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { Board } from "../service/board/service"
import { Issue } from "../service/issue/service"
import { generatDefaultIssues } from "../service/local/generator/generator-service"
import { KanbanBoardDisplaySettings } from "./kanban/KanbanBoard"
import ApiKanbanBoard from "./wrappers/ApiKanbanBoard"
import LocalKanbanBoard from "./wrappers/LocalKanbanBoard"

type KanbanPreviewSettings = {
  isApi: boolean
  displaySettings: KanbanBoardDisplaySettings
}

export type KanbanPreview = {
  title: string,
  settings: KanbanPreviewSettings
  onIssueSelected?: (issue: Issue) => void
  onBoardSelected?: (board: Board) => void
}

interface PreviewCarouselProps {
  index: number
  previews: KanbanPreview[]
  onPreviewChange: (_preview: KanbanPreview) => void
  onIssueSelected?: (issue: Issue) => void
  onBoardSelected?: (board: Board) => void
}

const KanbanPreview = ({ settings, onBoardSelected, onIssueSelected }: Omit<KanbanPreview, "title">) => {
  if (settings.isApi) {
    return (
      <ApiKanbanBoard
        onBoardSelected={onBoardSelected}
        onIssueSelected={onIssueSelected}
        displaySettings={settings.displaySettings}
      />
    )
  } else {
    return (
      <LocalKanbanBoard
        onBoardSelected={onBoardSelected}
        onIssueSelected={onIssueSelected}
        displaySettings={settings.displaySettings}
        boards={[
          {
            id: 1,
            name: "Local Board 1",
          },
          {
            id: 2,
            name: "Local Board 2",
          },
          {
            id: 3,
            name: "Local Board 3",
          },
          {
            id: 4,
            name: "Local Board 4",
          },
        ]}
        issues={generatDefaultIssues([1, 2, 3, 4], 10)}
      />
    )
  }
}

const KanbanPreviewCarousel = ({ index, previews, onPreviewChange, onBoardSelected, onIssueSelected }: PreviewCarouselProps) => {
  // Get the current preview
  const currentPreview = useMemo(() => {
    return previews[index] // Get the preview
  }, [previews, index])

  // Update the parent every time currentPreview re-renders
  useEffect(() => {
    onPreviewChange(currentPreview)
  }, [currentPreview, onPreviewChange])

  return (
    <Box width={"full"} height={"80vh"} overflow={"hidden"}>
      {currentPreview && (
        <KanbanPreview
          settings={currentPreview.settings}
          onBoardSelected={onBoardSelected}
          onIssueSelected={onIssueSelected}
        />
      )}
    </Box>
  )
}

export default KanbanPreviewCarousel