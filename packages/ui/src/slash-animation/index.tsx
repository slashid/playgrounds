import * as TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useState } from "react";
import * as styles from "./style.css";

type Props = {
  title: string;
  as?: "h1" | "h2" | "h3" | "div";
};

const animationDuration = 1200;
const animationDelay = 1000;
const progressMin = 0;
const progressMax = 1;

export const SlashAnimation: React.FC<Props> = ({ title, as = "div" }) => {
  const [progress, setProgress] = useState(progressMax);

  const Tag = as;
  const style = {
    "--x-percentage": `${progress * 100}%`,
  } as React.CSSProperties;

  useEffect(() => {
    const startTween = new TWEEN.Tween({ value: progressMax }, false)
      .to({ value: progressMin }, animationDuration)
      .easing(TWEEN.Easing.Back.Out)
      .delay(animationDelay)
      .onUpdate(({ value }) => {
        setProgress(value);
      })
      .start();

    const endTween = new TWEEN.Tween({ value: progressMin }, false)
      .to({ value: progressMax }, animationDuration)
      .easing(TWEEN.Easing.Back.Out)
      .delay(animationDelay)
      .onUpdate(({ value }) => {
        setProgress(value);
      })
      .start();

    startTween.chain(endTween);
    endTween.chain(startTween);

    const animate = () => {
      startTween.update();
      endTween.update();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className={`${styles.root}`} style={style}>
      <div className={styles.inner}>
        <span className={`${styles.hidden} ${styles.fontSlashAnimation}`}>
          {title}
        </span>
        <span className={`${styles.dots} ${styles.fontSlashAnimation}`}>
          {title.replace(/./gim, "•").substring(1)}
        </span>
        <div className={styles.title}>
          <Tag className={styles.fontSlashAnimation}>{title}</Tag>
        </div>
        <div className={styles.slash} />
      </div>
    </div>
  );
};
