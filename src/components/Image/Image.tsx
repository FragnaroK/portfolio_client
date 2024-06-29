import { CSSProperties, FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Image.css';

interface ImageProps extends DefaultComponentProps<undefined> {
  src?: string;
  alt?: string;
  fit?: CSSProperties["objectFit"];
}

const Image: FC<ImageProps> = ({
  onClick, fit, src, alt, ...imgProps
}) => {

  return (
    <div className="imageWrapper">
      <img
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