import { type InputHTMLAttributes } from 'react'
import { Controller, type Control, type FieldError, type FieldValues, type Path } from 'react-hook-form'

interface ControlledTextInputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: Path<T>
  control: Control<T>
  label?: string
  numeric?: boolean
  errorMessage?: string | FieldError
  multiline?: boolean
}

const inputClass =
  'w-full rounded-[10px] border border-gray-300 bg-transparent px-4 py-4 text-base outline-none'

const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  numeric = false,
  errorMessage,
  autoComplete = 'off',
  maxLength,
  multiline = false,
  ...rest
}: ControlledTextInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-[#818181]">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) =>
          multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              aria-label={label ?? 'input'}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={(e) => onChange(e.target.value.trim())}
              value={value ?? ''}
              maxLength={maxLength}
              className={`${inputClass} min-h-20 resize-y`}
            />
          ) : (
            <input
              ref={ref}
              aria-label={label ?? 'input'}
              type={numeric ? 'number' : 'text'}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={() => onChange(typeof value === 'string' ? value.trim() : value)}
              value={value ?? ''}
              autoComplete={autoComplete}
              maxLength={maxLength}
              className={inputClass}
              {...rest}
            />
          )
        }
      />
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage.toString()}</span>
      )}
    </div>
  )
}

export default ControlledTextInput
