'use client';

interface IProps {
  text: string,
  onClick?: () => void
}

export default function Button({ text, onClick } : IProps) {
    return (
      <button className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl">
        {text}
      </button>
    )
}