import HeroVideoDialog from "../ui/hero-video-dialog";

export default function HeroVideoDialogDemo() {
  return (
    <div className="relative
    w-6 h-6 mr-10
    ">
      <HeroVideoDialog
        className="dark:hidden block w-5 h-6"
        // animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        // thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        // thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block w-6 h-6"
        // animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        // thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        // thumbnailAlt="Hero Video/"
      />
    </div>
  );
}
