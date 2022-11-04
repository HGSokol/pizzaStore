import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={260}
    height={464.41}
    viewBox='0 0 280 464'
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx='140' cy='125' r='125'/>
    <rect x='0' y='279' rx='10' ry='10' width='280' height='23'/>
    <rect x='0' y='326' rx='10' ry='10' width='280' height='88'/>
    <rect x='0' y='436' rx='10' ry='10' width='95' height='30'/>
    <rect x='150' y='427' rx='24' ry='24' width='131.2' height='45'/>
  </ContentLoader>
)