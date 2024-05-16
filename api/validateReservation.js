const Reservation = require("./model/reservation");
const Admin = require("./model/admin")

const validateReservation = async (startTime, endTime) => {
    const data = await Admin.find({ Email: "devanshukaushal46@gmail.com" });
    // console.log(data);
    const count = data[0].TableCount;
    try {
        const res = await Reservation.find({});
        // console.log(res);
        for (let i = 1; i <= count; i++) {
            const newArr = res.filter((ele) => ele.TableNo == i);
            let flag = true;
            for (let j = 0; j < newArr.length; j++) {
                if (startTime > newArr.StartTime && startTime < newArr.EndTime) {
                    flag = false;
                }
                else if (endTime > newArr.StartTime && endTime < newArr.EndTime) {
                    flag = false;
                }
            }
            if (flag == true) {
                return i;
            }
        }
        return -1;
    } catch (e) {
        console.log(e);
    }
}
module.exports = validateReservation;