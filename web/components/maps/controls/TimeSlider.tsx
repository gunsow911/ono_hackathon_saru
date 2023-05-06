import Draggable from 'react-draggable'

const TimeSlider = () => {
  return (
    <Draggable cancel='.body'>
      <div style={{ width: 384 }} className='z-10 absolute top-2 left-2'>
        <div className='body px-2 pb-2 pt-1 bg-white opacity-90'>
          aaaaaaaaaaaaaaaaa
        </div>
      </div>
    </Draggable>
  )
}

export default TimeSlider
