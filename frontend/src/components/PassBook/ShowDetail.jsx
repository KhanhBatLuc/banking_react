import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSaving } from "../../store/action/transaction";
import moment from "moment";

const ShowDetail = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.transaction.detailSaving);
  const { userInfor } = useSelector((state) => state.user);
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    if (userInfor && userInfor.id) {
      dispatch(getSaving(userInfor.id));
    }
  }, [userInfor]);
  useEffect(() => {
    if (detail && detail.date) {
      let res = moment(detail.date).add(1, "months")._d;
      setEndDate(moment(res).format('YYYY/MM/DD'))
    }
  }, [detail]);

  return (
    <>
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single-curency">
                <div className="curency-text">
                  <span className="c-country">Thời gian gửi</span>
                  <span className="c-money">{detail && detail.date} - {endDate && endDate}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single-curency">
                <div className="curency-text">
                  <span className="c-country">Số tiền gửi</span>
                  <span className="c-money">
                    {detail && detail.moneySaving} VNĐ
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single-curency">
                <div className="curency-text">
                  <span className="c-country">Loại gửi</span>
                  <span className="c-money">
                    {detail && detail.typeRate == "6T"
                      ? "6 Tháng - Lãi suất 2%"
                      : "12 Tháng - Lãi suất 2.6%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDetail;
