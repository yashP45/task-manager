import React from 'react';
import KanbanBoard from './KanbanBoard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateTaskStage } from '../../lib/taskSlice';

const BoardContainer: React.FC = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there is no destination (dropped outside a droppable area) or if the item is dropped in the same location, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Dispatch the action to update the task's stage
    dispatch(updateTaskStage({ taskId: parseInt(draggableId), stage: destination.droppableId as 'not_started' | 'in_progress' | 'completed' }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center mt-8 flex-wrap">
        <KanbanBoard stage="not_started" />
        <KanbanBoard stage="in_progress" />
        <KanbanBoard stage="completed" />
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
