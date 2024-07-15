interface LiveStatusProps {
  isLive: boolean
}

export function LiveStatus(props: LiveStatusProps) {
  const { isLive } = props

  return (
    <div id="live-status">
      {isLive && (
        <a class="live_status" href="https://twitch.tv/romainlanz" rel="nofollow">
          <span></span> En Live
        </a>
      )}
    </div>
  )
}
