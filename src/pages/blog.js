import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { BlogLayout } from "../components/layout"
import { Helmet } from "react-helmet"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(sort: { order: DESC, fields: frontmatter___date }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "ddd DD MMMM YYYY")
              }
              excerpt
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  return (
    <BlogLayout>
      <Helmet title={`Blog : ${data.site.siteMetadata.title}`} />
      <div className="container mx-auto px-4 pt-16 max-w-screen-md">
        <div>
          {data.allMdx.edges.map(({ node }) => (
            <div
              key={node.id}
              className="hover:bg-gray-100 border-b overflow-hidden"
            >
              <span>
                <Link
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-3"
                  to={node.fields.slug}
                >
                  <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center">
                    <span>{node.frontmatter.title}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">
                      {node.frontmatter.date}
                    </span>
                  </div>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}
