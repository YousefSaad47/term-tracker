// 'use server';

// import { prisma } from '@/lib/prisma';
// import {
//   newsCreateSchema,
//   newsUpdateSchema,
//   NewsCreateArgs,
//   NewsUpdateArgs,
// } from '@/lib/validators';

// export async function createNews(rawData: unknown) {
//   try {
//     const data: NewsCreateArgs = newsCreateSchema.parse(rawData);
//     const news = await prisma.news.create({
//       data: {
//         content: data.content,
//         isPublished: data.isPublished ?? false,
//         subject: {
//           connect: { id: data.subjectId },
//         },
//       },
//     });
//     return news;
//   } catch (error) {
//     console.error('Error creating news:', error);
//     throw error;
//   }
// }

// export async function updateNews(id: string, rawData: unknown) {
//   try {
//     const data: NewsUpdateArgs = newsUpdateSchema.parse(rawData);
//     const newsItem = await prisma.news.update({
//       where: { id },
//       data,
//     });
//     return newsItem;
//   } catch (error) {
//     console.error('Error updating news:', error);
//     throw error;
//   }
// }

// export async function deleteNews(id: string) {
//   try {
//     const newsItem = await prisma.news.delete({
//       where: { id },
//     });
//     return newsItem;
//   } catch (error) {
//     console.error('Error deleting news:', error);
//     throw error;
//   }
// }

// export async function getNews(id: string) {
//   try {
//     return await prisma.news.findUnique({
//       where: { id },
//     });
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     throw error;
//   }
// }

// export async function getNewsBySubject(subjectId: string) {
//   try {
//     return await prisma.news.findMany({
//       where: { subjectId },
//       orderBy: { createdAt: 'desc' },
//     });
//   } catch (error) {
//     console.error('Error fetching news by subject:', error);
//     throw error;
//   }
// }
