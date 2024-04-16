import './Input.css';

export default function Input({ label, placeholder, onChange, type, value }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className='input'
            />
        </div>
    )
}

