import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={260}
    heigth={460}
    viewBox='0 0 280 460'
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx='135' cy='125' r='125'/>
    <rect x='0' y='279' rx='10' ry='10' width='280' height='23'/>
    <rect x='0' y='326' rx='10' ry='10' width='280' height='88'/>
    <rect x='0' y='436' rx='10' ry='10' width='95' height='30'/>
    <rect x='125' y='427' rx='24' ry='24' width='152' height='45'/>
  </ContentLoader>
)