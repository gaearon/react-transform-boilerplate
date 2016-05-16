import React from 'react'
import { NICE, SUPER_NICE } from './colors'
import Counter from './Counter'

const App = () => (
    <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
    </div>  
)

export default App