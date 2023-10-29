import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import moment from "moment";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = ({ seller = false }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  return (
    <div className="d-flex justify-content-around">
      <>
        <Ribbon text="New" color="blue">
          <Card className="bg-light pt-1">
            <Meta
              avatar={<Avatar>V</Avatar>}
              title="Vishesh Verma"
              description={`Joined ${moment(user.createdAt).fromNow()}`}
            />

          </Card>
        </Ribbon>
      </>
    </div>
  );
};

export default ConnectNav;
