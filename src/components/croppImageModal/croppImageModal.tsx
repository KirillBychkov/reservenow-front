import Cropper, { Area, Point } from "react-easy-crop";
import { Dialog } from "primereact/dialog";
import Button from "@/components/UI/buttons/button";
import Flex from "@/components/UI/layout/flex";
import getCroppedImg from "@/utils/cropImage";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./croppImageModal.module.scss";
import { useTranslation } from "react-i18next";

type ModalProps = {
  image?: string;
  visible: boolean;
  onHide: () => void;
  onCropComplete: (image: string) => void;
};

export const CroppImageModal = ({
  visible,
  onHide,
  image,
  onCropComplete,
}: ModalProps) => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [currentImage, setCurrentImage] = useState(image);
  const ref = useRef<HTMLInputElement>(null);
  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    const croppedImage = await getCroppedImg(
      currentImage as string,
      croppedAreaPixels as Area
    );
    onCropComplete(croppedImage as string);
    onHide();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentImage(URL.createObjectURL(e?.target?.files![0]));
  };

  const handleClick = () => {
    ref.current?.click();
  };

  const footerTemplate = () => {
    return (
      <Flex options={{ justify: "flex-end", gap: 1 }}>
        <input ref={ref} type="file" hidden onChange={handleFileChange} />
        <Button onClick={handleClick} outlined className={styles.btn} fill>
          {t("profile.chooseFile")}
        </Button>
        <Button className={styles.btn} fill onClick={showCroppedImage}>
          {t("actions.save")}
        </Button>
      </Flex>
    );
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={t("forms.profilePhoto")}
      footer={footerTemplate}
      blockScroll
      dismissableMask
      draggable={false}
    >
      <Flex
        className={styles.cropperBody}
        options={{ justify: "center", align: "center" }}
      >
        {currentImage ? (
          <Cropper
            image={currentImage}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            showGrid={false}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <Flex options={{ direction: "column", align: "center" }}>
            <h2 className="heading heading-2 heading-primary text-center">
              {t('profile.photoNull')}
            </h2>
          </Flex>
        )}
      </Flex>
    </Dialog>
  );
};
