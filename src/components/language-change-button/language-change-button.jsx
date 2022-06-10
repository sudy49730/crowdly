import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "rsuite";
import { CHANGE_LANGUAGE } from "../../state-management/actions";
import { Label } from "../";

const LanguageChangeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const changeLanguage = (newLanguage) => {
    dispatch(CHANGE_LANGUAGE(newLanguage));
  };
  return (
    <>
      <i
      style={{fontSize:'30px', cursor:'pointer'}}
        className="uil uil-language language-icon"
        onClick={() => setIsOpen(true)}
      ></i>
      <Modal size="xs" open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <h4>
            {" "}
            <Label i18nKey={"CHANGE_LANGUAGE"} />
          </h4>
          <p>
            {" "}
            <Label i18nKey={"CHANGE_LANGUAGE_DESCRIPTION"} />
          </p>
        </Modal.Header>
        <Modal.Body>
          <Button
            style={{ marginRight: "2%" }}
            appearance="primary"
            onClick={() => changeLanguage("hi")}
          >
            हिन्दी
          </Button>
          <Button
            style={{ marginRight: "2%" }}
            appearance="primary"
            onClick={() => changeLanguage("en")}
          >
            English
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { LanguageChangeButton };
