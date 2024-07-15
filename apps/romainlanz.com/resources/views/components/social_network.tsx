import { Vite } from '#start/view'

interface SocialNetworkProps {
  name: string
  link: string
  icon?: string
}

export function SocialNetwork(props: SocialNetworkProps) {
  const { name, link, icon } = props

  return (
    <a class="social_network" href={link} rel="nofollow">
      <Vite.Image
        src={`resources/images/socials/${icon ? icon.toLowerCase() : name.toLowerCase()}.svg`}
        alt=""
      />
      {name}
    </a>
  )
}
