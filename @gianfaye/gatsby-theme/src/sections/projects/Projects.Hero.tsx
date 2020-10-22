import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Bio from '@components/Bio';
import Works from '@components/Works';
import Icons from '@icons';
import mediaqueries from '@styles/media';
import { IWork } from '@types';

//import { GridLayoutContext } from './Projects.List.Context';
import { GridLayoutContext } from '../articles/Articles.List.Context';

const workQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ProjectsHero: React.FC<IWork> = ({ works }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(workQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  // const featuredWork = works.find(work => work.featured);
  //
  // if (!featuredWork) {
  //   throw new Error(`
  //     No featured Work found.
  //     Please ensure you have at least featured Work.
  // `);
  // }

  return (
    <Section narrow id="Projects__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: "Projects" }} />
      </HeadingContainer>
    </Section>
  );
};

export default ProjectsHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.desktop`
    margin-bottom: 80px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    display: none;
  `};
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const HeadingContainer = styled.div`
  margin: 100px 0;
  display: inline-block;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 80px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 24px;
  `}
`;

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;
