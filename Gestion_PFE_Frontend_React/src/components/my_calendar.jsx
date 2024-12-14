import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'; // Style pour drag-and-drop
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar); // Active le DnD

const MyCalendar = ({ events, onEventDrop }) => {
  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onEventDrop={onEventDrop} // Drag-and-drop handler
      draggableAccessor={() => true} // Rend les événements déplaçables
    />
  );
};

export default MyCalendar;
