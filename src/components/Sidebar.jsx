import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";

function Sidebar({ user, icon }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { signOut} = useClerk()

  return (
    <>
      {/* Trigger button ☰ */}
      {icon === "long" && (
        <button
        className="menu-icon btn btn-light-subtle  ms-3"
        onClick={handleShow}
      >
        ☰
      </button>
      )}
      {icon === "Show Profile" && (
        <a href="#" onClick={handleShow} className="nav-link fw-bold"> Show Profile </a>
      )}

      {/* Profile Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
           <img
    src={user?.imageUrl}
    alt="Profile"
    className="rounded-circle mb-3"
    style={{ width: "120px", height: "120px", objectFit: "cover" }}
  />
          <h5>{user?.username || user?.firstName}</h5>
          <p className="text-muted">{user?.emailAddresses[0].emailAddress || "john@example.com"}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              signOut();
              handleClose();
            }}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Sidebar;
