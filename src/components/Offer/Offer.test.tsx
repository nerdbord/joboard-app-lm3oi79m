import React from 'react';
import { render, fireEvent, getByRole, screen } from '@testing-library/react';
import OffersList from '../OffersList/OffersList'; // Замените на ваш реальный компонент
import FiltersContainer from '../FiltersContainer/FiltersContainer'; // Замените на ваш реальный компонент
import { DataProvider } from '../../context/DataContext';
import { test, expect, vi, beforeAll, afterAll } from 'vitest'; // Замените на ваш контекст и провайдер данных

beforeAll(() => {
   window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
   }));
});

afterAll(() => {
   window.matchMedia;
});
const handleFilterMock = vi.fn();
const mockData = [
   {
      _id: '648b7add0905a510f1c7fe02',
      title: 'Data Engineer',
      companyName: 'LMN Co',
      city: 'London',
      country: 'UK',
      workLocation: 'Remote',
      jobType: 'Full-time',
      seniority: 'Mid/Regular',
      salaryFrom: 60000,
      salaryTo: 90000,
      currency: 'GBP',
      technologies: ['Python', 'SQL', 'Big Data'],
      description:
         'We are looking for a Data Engineer to join our team. You will be responsible for designing and implementing data pipelines, integrating data from various sources, and optimizing data storage and retrieval using Python, SQL, and big data technologies. The ideal candidate should have strong programming and data modeling skills.',
      offerUrl: 'https://nerdbord.io',
      __v: 0,
      createdAt: '2023-06-15T20:55:57.198Z',
      updatedAt: '2023-10-14T19:49:23.972Z',
      image: 'https://i.imgur.com/yaKYWeN.png',
   },
   {
      _id: '648b7add0905a510f1c7fe07',
      title: 'Marketing Coordinator',
      companyName: 'LMN Co',
      city: 'London',
      country: 'UK',
      workLocation: 'Part-remote',
      jobType: 'Part-Time',
      seniority: 'Mid/Regular',
      salaryFrom: 35000,
      salaryTo: 45000,
      currency: 'GBP',
      technologies: ['Digital Marketing', 'Social Media', 'Google Analytics'],
      description:
         'We are seeking a skilled Marketing Coordinator to join our team. You will be responsible for implementing marketing campaigns, managing social media channels, and analyzing marketing performance using tools like Google Analytics. The ideal candidate should have a solid understanding of digital marketing strategies and be familiar with various marketing channels.',
      offerUrl: 'https://nerdbord.io',
      __v: 0,
      createdAt: '2023-06-15T20:55:57.199Z',
      updatedAt: '2023-10-14T19:49:24.196Z',
      image: 'https://i.imgur.com/3FXDIlJ.png',
   },
   {
      _id: '648b7add0905a510f1c7fdfa',
      title: 'Front-end Developer',
      companyName: 'PQR Ltd',
      city: 'Sydney',
      country: 'Australia',
      workLocation: 'On-site',
      jobType: 'Freelance',
      seniority: 'Mid/Regular',
      salaryFrom: 40000,
      salaryTo: 60000,
      currency: 'AUD',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      description:
         'We are looking for a skilled Front-end Developer to join our team on a part-time basis. You will be responsible for creating user-friendly web interfaces using HTML, CSS, and JavaScript. The ideal candidate should have a strong command of front-end technologies and be experienced in responsive design.',
      offerUrl: 'https://nerdbord.io',
      __v: 0,
      createdAt: '2023-06-15T20:55:57.197Z',
      updatedAt: '2023-10-14T19:49:23.609Z',
      image: 'https://i.imgur.com/uiDZrVV.png',
   },
];

test('JobType is displayed correctly based on selected filters', () => {
   const { getByText } = render(
      <DataProvider>
         <FiltersContainer />
         <OffersList offers={mockData} />
      </DataProvider>,
   );

   const checkbox = screen.getByRole('checkbox');
   fireEvent.click(checkbox);
   screen.debug();
   expect(screen.getAllByRole('checkbox', { checked: true }));
   console.log('test all checkbox');

   expect(handleFilterMock).toHaveBeenCalledWith('Full-time');
   const fullTimeCheckbox = screen.getByTestId('datatest-Full-Time');
   const partTimeCheckbox = screen.getByText('Part-Time');
   const freelanceCheckbox = screen.getByText('Freelance');

   // By default, all offers should be displayed
   expect(getByText('Data Engineer')).toBeInTheDocument();
   expect(getByText('Marketing Coordinator')).toBeInTheDocument();
   expect(getByText('Front-end Developer')).toBeInTheDocument();

   // Select Full-Time checkbox
   fireEvent.click(fullTimeCheckbox);

   // Offers with Full-Time jobType should be displayed
   expect(getByText('Data Engineer')).toBeInTheDocument();
   expect(getByText('Marketing Coordinator')).not.toBeInTheDocument();
   expect(getByText('Front-end Developer')).not.toBeInTheDocument();

   // Deselect Full-Time and select Part-Time checkbox
   fireEvent.click(fullTimeCheckbox);
   fireEvent.click(partTimeCheckbox);

   // Offers with Part-Time jobType should be displayed
   expect(getByText('Data Engineer')).not.toBeInTheDocument();
   expect(getByText('Marketing Coordinator')).toBeInTheDocument();
   expect(getByText('Front-end Developer')).not.toBeInTheDocument();

   // Deselect Part-Time and select Freelance checkbox
   fireEvent.click(partTimeCheckbox);
   fireEvent.click(freelanceCheckbox);

   // Offers with Freelance jobType should be displayed
   expect(getByText('Data Engineer')).not.toBeInTheDocument();
   expect(getByText('Marketing Coordinator')).not.toBeInTheDocument();
   expect(getByText('Front-end Developer')).toBeInTheDocument();
});
