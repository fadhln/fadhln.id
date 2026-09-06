import { Button } from "-/modules/shared/components/Button";
import Text from "-/modules/shared/components/Text";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type ContentFooterProps = {
  githubUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

function ContentFooter({ githubUrl, createdAt, updatedAt }: ContentFooterProps) {
  return (
    <div className="shadow-border-t mt-8 flex justify-between pt-4">
      <div className="flex flex-col gap-2 text-xs">
        <Text>Found any mistakes or typos?</Text>
        <div>
          <Button
            variant="secondary"
            size="sm"
            icon={<GitHubLogoIcon />}
            render={<a href={githubUrl} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
          >
            Edit on GitHub
          </Button>
        </div>
      </div>
      <div className="text-on-bg-secondary flex flex-col items-end text-xs">
        {createdAt && <Text>Created at: {createdAt}</Text>}
        {updatedAt && <Text>Last edited at: {updatedAt}</Text>}
      </div>
    </div>
  );
}

export default ContentFooter;
