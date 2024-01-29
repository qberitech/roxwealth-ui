import {
  faAngleLeft,
  faAngleRight,
  faArchive,
  faRedo,
  faStar,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Button from "components/base/Button";
import IndeterminateCheckbox from "components/base/IndeterminateCheckbox";
import TooltipIconButton from "components/common/TooltipIconButton";
import { useBulkSelect } from "providers/BulkSelectProvider";

interface InboxToolbarProps {
  size?: "sm" | "lg";
  className?: string;
}

const InboxToolbar = ({ size = "lg", className }: InboxToolbarProps) => {
  const { getParentCheckboxProps } = useBulkSelect();
  return (
    <>
      <div
        className={classNames(
          className,
          "d-flex align-items-center flex-wrap position-sticky pb-2 bg-soft z-index-2 email-toolbar",
        )}
      >
        <div className="d-flex align-items-center flex-1 me-2">
          <Button className="p-0 me-2" onClick={() => location.reload()}>
            <FontAwesomeIcon icon={faRedo} className="text-primary fs-10" />
          </Button>
          <p className="fw-semi-bold fs-10 text-600 mb-0 lh-sm text-nowrap">
            Last refreshed 1m ago
          </p>
        </div>
        <div className="d-flex gap-3">
          <p className="text-600 fs-9 fw-semi-bold mb-0">
            {size === "lg" ? "Showing : " : " "}
            <span className="text-900">1-7</span>
            {" of "}
            <span className="text-900">205</span>
          </p>
          <Button className="p-0" type="button">
            <FontAwesomeIcon icon={faAngleLeft} className="text-500 fs-10" />
          </Button>
          <Button className="p-0" type="button">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-primary fs-10"
            />
          </Button>
        </div>
      </div>
      <div className="border-y py-2 d-flex justify-content-between">
        <IndeterminateCheckbox {...getParentCheckboxProps()} />
        <div className="d-flex gap-2">
          <TooltipIconButton
            iconClass="fs-10"
            title="Archive"
            icon={faArchive}
          />
          <TooltipIconButton iconClass="fs-10" title="Delete" icon={faTrash} />
          <TooltipIconButton iconClass="fs-10" title="Star" icon={faStar} />
          <TooltipIconButton iconClass="fs-10" title="Tags" icon={faTag} />
        </div>
      </div>
    </>
  );
};

export default InboxToolbar;
