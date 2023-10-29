import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { msgPoster } from "../actions/service";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

const SmallCard = ({
  p,
  handleServiceDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {

  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const history = useNavigate();

  const handleMail = async () => {
    try {
    let res = await msgPoster()
    .then(()=> {
      toast.success("Email sent!")
    })
  } catch (err) {
    toast.error("An error occured. Please try again.")
  }

    console.log('doneeee')
  };
  console.log(p);
  return (
    <>
      <div className="card me-2 p-5 h-100 w-100 flex-1">
        <div className="row no-gutters">
          <div className="col-md-4">
            {p.image && p.image.contentType ? (
              <img
                src={`http://localhost:8080/api/service/image/${p._id}`}
                alt="Service Image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="Default Service Image"
                className="card=image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {p.title}{" "}
              </h3>

              <h6 className="alert alert-info">
                {p.description.length > 300
                  ? `${p.description.substring(0, 300)}...`
                  : p.description}
              </h6>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => handleMail()}
                    className="btn btn-primary"
                  >
                    Show More
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/service/edit/${p._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleServiceDelete(p._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
