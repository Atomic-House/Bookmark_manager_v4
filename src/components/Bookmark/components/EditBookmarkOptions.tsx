import { BiPencil } from "@react-icons/all-files/bi/BiPencil"
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar"
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar"
import { BsFillTrashFill } from "@react-icons/all-files/bs/BsFillTrashFill"
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze"
import { BsFillCalendarFill } from "@react-icons/all-files/bs/BsFillCalendarFill"
export default function EditBookmarkOptions() {
  return (

    <ul>
      <li>
        <span><BiPencil /></span><span>Edit</span>
      </li>
      <li>
        <span>
          <span>
            <BiAlarmSnooze />
          </span><span>Add Snooze</span>
        </span>
        <span>
          <span>
            <BsFillCalendarFill />
          </span><span>Add Reminder</span>
        </span>
      </li>
      <li>
        <span>
          <AiOutlineStar />
        </span><span>Mark As Favorite</span>
      </li>
      <li>
        <span>
          <BsFillTrashFill />
        </span>

        <span>Move to trash</span>
      </li>
    </ul>
  )
}
