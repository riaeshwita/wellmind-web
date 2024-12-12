import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);

export default dayjs;
