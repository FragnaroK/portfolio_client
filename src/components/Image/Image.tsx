import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Image.css';
import classNames from "classnames";

interface ImageProps extends DefaultComponentProps<undefined> {
  src?: string;
  alt?: string;
  fit?: CSSProperties["objectFit"];
}

const Image: FC<ImageProps> = ({
  fit, src, alt, ...imgProps
}) => {

  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);


  useEffect(() => {
    if (!imgRef.current || imageLoaded) return;

    imgRef.current.onload = () => {
      setImageLoaded(true);
    }

  }, [imgRef, imageLoaded])

  return (
    <div className={classNames("imageWrapper", imageLoaded ? 'loaded' : '')}>
      <img
        ref={imgRef}
        src={src ?? ""}
        alt={alt}
        aria-hidden={!alt}
        {...imgProps}
        style={{ objectFit: fit ?? "contain" }}
      />
    </div>
  )
}

export default Image