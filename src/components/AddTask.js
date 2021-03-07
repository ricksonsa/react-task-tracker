import { useState } from 'react';

const AddTask = ({onAddTask}) => {
    const [text, setText] = useState();
    const [day, setDay] = useState();
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text) {
            alert('Please specify a task');
            return;
        }

        onAddTask({text, day, reminder});

        setText('');
        setDay('');
        setReminder('');
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="text">Task</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Add Task' />
            </div>

            <div className="form-control">
                <label htmlFor="text">Day & Time</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder='Add Day & Time' />
            </div>

            <div className="form-control form-control-check">
                <label htmlFor="text">Set Reminder</label>
                <input checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} type="checkbox" />
            </div>   

            <input className='btn btn-block' type="submit" value='Save Task'/>         
        </form>
    )
}

export default AddTask
