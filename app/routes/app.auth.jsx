
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return { accessToken: session.accessToken, shop: session.shop, scope: session.scope };
};


export default function AuthPage() {
  const { accessToken, shop, scope } = useLoaderData();
  return (
    <s-page heading="Auth page">
      <s-section heading="Session Info">
        <s-paragraph>
          <strong>Shop:</strong> <code>{shop}</code>
        </s-paragraph>
        <s-paragraph>
          <strong>Access Token:</strong> <code>{accessToken}</code>
        </s-paragraph>
        <s-paragraph>
          <strong>Scope:</strong>
        </s-paragraph>
        <s-list>
          {scope?.split(',').map((s) => (
            <s-list-item key={s}>{s.trim()}<br /></s-list-item>
          ))}
        </s-list>
      </s-section>
    </s-page>
  );
}
