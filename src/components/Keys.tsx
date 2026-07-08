import React from 'react'


export default function Keys({setSelectedKey}: {setSelectedKey: (key: number) => void}) {
    const handleKeyClick = (key: number) => {
        console.log(`Key ${key} clicked`);
        setSelectedKey(key);
    }

  return (
        <div className='key-row'>
            {
                Array(9).fill(0).map((_, index) => (
                    <div className='key' key={index} onClick={() => handleKeyClick(index + 1)}>
                        {index + 1}
                    </div>
                ))
            }
        </div>
  )
}
