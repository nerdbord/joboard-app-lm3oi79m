import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'close' | 'open';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'close', ...props }) => {
   const buttonClass = variant === 'close' ? styles.closeBtn : styles.openBtn;
   return (
      <button className={`${styles.button} ${buttonClass}`} {...props}>
         {children}
      </button>
   );
};

export default Button;
