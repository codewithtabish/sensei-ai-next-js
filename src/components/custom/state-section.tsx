import React from 'react'
import { NumberTicker } from '../ui/number-ticker'
import { Percent, Plus } from 'lucide-react'

const StateSection = () => {
    return (
        <div>
            {/* Stats Section */}
            <section className="w-full py-12 md:py-24 ">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className='flex flex-row gap-2 items-center'>

                                <NumberTicker
                                    value={100}
                                    className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                                />
                                <Plus className='w-6 h-6' />
                            </div>
                            {/* <h3 className="text-4xl font-bold">50+</h3> */}
                            <p className="text-muted-foreground">Industries Covered</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className='flex flex-row gap-2 items-center'>

                                <NumberTicker
                                    value={1000}
                                    className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                                />
                                <Plus className='w-6 h-6' />
                            </div>
                            <p className="text-muted-foreground">Interview Questions</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className='flex flex-row gap-2 items-center'>

                                <NumberTicker
                                    value={99}
                                    className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                                />
                                <Percent className='w-6 h-6' />
                            </div>
                            <p className="text-muted-foreground">Success Rate</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                        <div className='flex flex-row gap-2 items-center'>

<NumberTicker
value={24}
className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
/>
<h4 className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
>/ 7</h4>
{/* <Plus className='w-6 h-6'/> */}
</div>
                            {/* <h3 className="text-4xl font-bold">24/7</h3> */}
                            <p className="text-muted-foreground">AI Support</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default StateSection
