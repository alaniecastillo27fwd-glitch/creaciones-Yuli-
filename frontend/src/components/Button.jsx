export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  className = ''
}) {
  const variantClass =
    variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'outline'
        ? 'btn-outline'
        : 'btn-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${className}`}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </button>
  );
}
