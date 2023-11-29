export default function SubTitle({ children, className, primary, secondary, success, danger, warning, dark }) {

  const buttonClasses = `text-lg md:text-xl font-bold px-2 py-0.5 rounded border table mt-2 
    ${className || ''}
    ${primary ? 'bg-blue-100 text-blue-700 border-blue-400' :
      secondary ? 'bg-amber-100 text-amber-700 border-amber-400' :
        success ? 'bg-lime-100 text-lime-700 border-lime-400' :
          danger ? 'bg-red-100 text-red-700 border-red-400' :
            warning ? 'bg-yellow-100 text-yellow-700 border-yellow-400' :
              dark ? 'bg-slate-100 text-slate-700 border-slate-400' :
                'bg-blue-100 text-blue-700 border-blue-400'}`;
  return (
    <span className={buttonClasses}>{children}</span>
  )
}
