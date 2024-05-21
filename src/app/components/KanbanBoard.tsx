import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/lib/Dropabble';
import { deleteTask } from '../../lib/taskSlice'
import { FaTrash } from 'react-icons/fa';

interface KanbanBoardProps {
  stage: 'not_started' | 'in_progress' | 'completed';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ stage }) => {
  const tasks = useSelector((state: RootState) =>
    state?.tasks?.tasks?.filter(task => task.stage === stage)
  );
  const dispatch = useDispatch();

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const getBackgroundColor = (stage: 'not_started' | 'in_progress' | 'completed') => {
    switch (stage) {
      case 'not_started':
        return 'bg-gray-100 border-gray-300';
      case 'in_progress':
        return 'bg-yellow-100 border-yellow-300';
      case 'completed':
        return 'bg-green-100 border-green-300';
      default:
        return '';
    }
  };

  return (
    <div className="sm:w-1/3 p-4 w-full">
      <h2 className="text-lg font-bold mb-2">{stage.replace('_', ' ')}</h2>
      <StrictModeDroppable droppableId={stage} key={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 rounded ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-gray-100'}`}
            style={{ minHeight: '200px' }}
          >
            {tasks?.map((task, index) => (
              <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-4 p-2 shadow-md rounded ${getBackgroundColor(stage)} ${snapshot.isDragging ? 'opacity-75' : ''} border relative`}
                  >
                    <p className='text-black'>{task.title}</p>
                    <button
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(task.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default KanbanBoard;
