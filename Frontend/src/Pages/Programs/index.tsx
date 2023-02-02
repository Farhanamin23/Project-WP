import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adapter, baseUrl } from '../../actions/global'
import CardProgram from '../../component/CardProgram/CardProgram'
import { iProgram } from '../../interface'

const Programs: React.FC = () => {
    const [programs, setPrograms] = useState<iProgram[]>()
    const navigate = useNavigate()

    const handleGetData = async () => {
        try {
            const res = await adapter.get('/programs?populate=*');

            if (res.status != 200) {
                throw res
            }

            const programs = res.data.data.map((it: any) => {
                return {
                    id: it.id,
                    title: it.attributes.title,
                    description: it.attributes.description,
                    imageSrc: baseUrl + it.attributes.image.data.attributes.url
                }
            })

            setPrograms(programs)
        } catch (error) {
        }
    }

    useEffect(() => {
        handleGetData()
        return () => { }
    }, [])

    return (
        <main className='px-3 pb-10 bg-[url("/public/img/bg-page-donate.png")] md:bg-[url("/public/img/bg-page-donate-desktop.png")]'>
            <div className='pt-16  max-w-5xl lg:pt-[75px] mx-auto '>
                <div className='flex flex-col justify-center items-center mt-4 lg:mb-6 lg:mt-16'>
                    <p className="font-primary text-p-primary text-xl lg:text-4xl">Our Program</p>
                    <div className="flex  w-[105px] h-[6px] bg-p-yellow lg:w-[190px]"></div>
                </div>
                {
                    programs?.map((it: iProgram) => {
                        return (
                            <CardProgram
                                title={it.title}
                                description={it.description}
                                imageSrc={it.imageSrc}
                                onClick={() => { navigate(`${it.id}`) }}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Programs 