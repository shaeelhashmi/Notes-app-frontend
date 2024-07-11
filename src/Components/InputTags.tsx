
interface InputTagsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  function?: any;
  required?: boolean;
}

export default function InputTags(props: InputTagsProps) {
  return (
    <div className="flex items-center mt-8">
      <label htmlFor={props.name} className='w-1/3 text-lg text-white'>{props.label}</label>
      <input 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder} 
        className='w-[63%] p-3 text-sm bg-[rgb(134_130_255)] border-l-0 border-r-0 border-t-0 border-b text-black placeholder-black'
        onChange={props.function?props.function:(e)=>e.currentTarget.value}
        required={props.required ? true : false}
      />
    </div>
  );
}